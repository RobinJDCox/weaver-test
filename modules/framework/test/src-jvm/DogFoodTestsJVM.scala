package weaver
package framework
package test

import cats.effect.IO
import cats.implicits._

object DogFoodSuiteJVM extends SimpleIOSuite with DogFood {

  // This tests the global resource sharing mechanism by running a suite that
  // acquires a temporary file that gets created during global resource initialisation.
  // The suite contains a test which logs the location of the file and fails to ensure logs
  // get dispatched.
  // We then recover the location of the file, which happens after the dogfooding framework finishes
  // its run. At this point, the file should have been deleted by the global resource initialisation
  // mechanism, which we test for.
  simpleTest("global sharing suites") {
    import Fingerprinted._
    runSuites(moduleSuite(Meta.MutableSuiteTest),
              sharingSuite[MetaJVM.TmpFileSuite],
              globalInit(MetaJVM.GlobalStub)).flatMap {
      case (logs, events) =>
        val file = logs.collectFirst {
          case LoggedEvent.Error(msg) if msg.contains("file:") =>
            msg.split("file:")(1).trim()
        }
        for {
          path <- file.liftTo[IO](new Exception("file log not found"))
          file <- IO(new java.io.File(path))
        } yield {
          val errorCount =
            events.count(_.status() != sbt.testing.Status.Success)
          // The "GlobalStub" implements logic to clean up the file
          // at the end of the test run.
          // We're testing the file has indeed been cleaned up
          expect(errorCount == 1) && expect(!file.exists())
        }
    }
  }

}
