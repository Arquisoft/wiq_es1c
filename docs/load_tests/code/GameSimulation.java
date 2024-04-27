
import java.time.Duration;
import java.util.*;

import io.gatling.javaapi.core.*;
import io.gatling.javaapi.http.*;
import io.gatling.javaapi.jdbc.*;

import static io.gatling.javaapi.core.CoreDsl.*;
import static io.gatling.javaapi.http.HttpDsl.*;
import static io.gatling.javaapi.jdbc.JdbcDsl.*;

public class GameSimulation extends Simulation {

  private HttpProtocolBuilder httpProtocol = http
    .baseUrl("http://40.66.46.204:8003")
    .inferHtmlResources()
    .acceptHeader("*/*")
    .acceptEncodingHeader("gzip, deflate")
    .acceptLanguageHeader("es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3")
    .originHeader("http://wiqgame.run.place")
    .userAgentHeader("Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:125.0) Gecko/20100101 Firefox/125.0");
  
  private Map<CharSequence, String> headers_0 = Map.ofEntries(
    Map.entry("Access-Control-Request-Headers", "content-type"),
    Map.entry("Access-Control-Request-Method", "POST")
  );
  
  private Map<CharSequence, String> headers_2 = Map.ofEntries(
    Map.entry("Accept", "application/json, text/plain, */*"),
    Map.entry("Content-Type", "application/json")
  );


  private ScenarioBuilder scn = scenario("GameSimulation")
    .exec(
      http("request_0")
        .options("/api/game/new")
        .headers(headers_0)
        .resources(
          http("request_1")
            .options("/api/game/settings")
            .headers(headers_0),
          http("request_2")
            .post("/api/game/settings")
            .headers(headers_2)
            .body(RawFileBody("gamesimulation/0002_request.json")),
          http("request_3")
            .post("/api/game/new")
            .headers(headers_2)
            .body(RawFileBody("gamesimulation/0003_request.bin")),
          http("request_4")
            .options("/api/game/next")
            .headers(headers_0),
          http("request_5")
            .post("/api/game/next")
            .headers(headers_2)
            .body(RawFileBody("gamesimulation/0005_request.json")),
          http("request_6")
            .options("/api/game/update")
            .headers(headers_0)
        )
    );

  {
	  setUp(scn.injectOpen(atOnceUsers(1))).protocols(httpProtocol);
  }
}
