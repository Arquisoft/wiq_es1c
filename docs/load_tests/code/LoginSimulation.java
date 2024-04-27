
import java.time.Duration;
import java.util.*;

import io.gatling.javaapi.core.*;
import io.gatling.javaapi.http.*;
import io.gatling.javaapi.jdbc.*;

import static io.gatling.javaapi.core.CoreDsl.*;
import static io.gatling.javaapi.http.HttpDsl.*;
import static io.gatling.javaapi.jdbc.JdbcDsl.*;

public class LoginSimulation extends Simulation {

  private HttpProtocolBuilder httpProtocol = http
    .baseUrl("http://40.66.46.204:8001")
    .inferHtmlResources()
    .acceptHeader("*/*")
    .acceptEncodingHeader("gzip, deflate")
    .acceptLanguageHeader("es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3")
    .userAgentHeader("Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:125.0) Gecko/20100101 Firefox/125.0");
  
  private Map<CharSequence, String> headers_0 = Map.ofEntries(
    Map.entry("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8"),
    Map.entry("Upgrade-Insecure-Requests", "1")
  );
  
  private Map<CharSequence, String> headers_1 = Map.ofEntries(
    Map.entry("Access-Control-Request-Headers", "content-type"),
    Map.entry("Access-Control-Request-Method", "POST"),
    Map.entry("Origin", "http://wiqgame.run.place")
  );
  
  private Map<CharSequence, String> headers_2 = Map.ofEntries(
    Map.entry("Accept", "application/json, text/plain, */*"),
    Map.entry("Content-Type", "application/json"),
    Map.entry("Origin", "http://wiqgame.run.place")
  );
  
  private Map<CharSequence, String> headers_5 = Map.ofEntries(
    Map.entry("Accept", "image/avif,image/webp,*/*"),
    Map.entry("If-None-Match", "\"2703dd875fee9f83862e5ddddd0c83066db3db0a\"")
  );
  
  private Map<CharSequence, String> headers_6 = Map.ofEntries(
    Map.entry("Accept", "image/avif,image/webp,*/*"),
    Map.entry("If-None-Match", "\"d0c780791798822d083faa134b4e4c44f0edaacd\"")
  );
  
  private String uri1 = "40.66.46.204";
  
  private String uri2 = "http://wiqgame.run.place";

  private ScenarioBuilder scn = scenario("LoginSimulation")
    .exec(
      http("request_0")
        .get(uri2 + "/login")
        .headers(headers_0),
      pause(5),
      http("request_1")
        .options("/api/auth/login")
        .headers(headers_1)
        .resources(
          http("request_2")
            .post("/api/auth/login")
            .headers(headers_2)
            .body(RawFileBody("loginsimulation/0002_request.json")),
          http("request_3")
            .options("/api/auth/verify")
            .headers(headers_1),
          http("request_4")
            .post("/api/auth/verify")
            .headers(headers_2)
            .body(RawFileBody("loginsimulation/0004_request.bin")),
          http("request_5")
            .get(uri2 + "/static/media/wiq_banner.72e2dbab15a075289fa5.png")
            .headers(headers_5),
          http("request_6")
            .get(uri2 + "/static/media/wiq_banner.light.4fe52d0e6b07455671e6.png")
            .headers(headers_6),
          http("request_7")
            .options("http://" + uri1 + ":8004/api/userdetails/name")
            .headers(headers_1),
          http("request_8")
            .options("http://" + uri1 + ":8002/api/questions/tags")
            .headers(headers_1),
          http("request_9")
            .post("http://" + uri1 + ":8002/api/questions/tags")
            .headers(headers_2)
            .body(RawFileBody("loginsimulation/0009_request.json")),
          http("request_10")
            .post("http://" + uri1 + ":8004/api/userdetails/name")
            .headers(headers_2)
            .body(RawFileBody("loginsimulation/0010_request.json"))
        )
    );

  {
	  setUp(scn.injectOpen(atOnceUsers(1))).protocols(httpProtocol);
  }
}
