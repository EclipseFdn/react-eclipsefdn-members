package org.eclipsefoundation.react.resources;

import static io.restassured.RestAssured.given;
import static io.restassured.module.jsv.JsonSchemaValidator.matchesJsonSchemaInClasspath;

import static org.hamcrest.CoreMatchers.*;

import java.util.Collections;
import java.util.List;
import java.util.Optional;


import org.eclipsefoundation.core.helper.CSRFHelper;
import org.eclipsefoundation.react.model.MembershipForm;
import org.eclipsefoundation.react.test.helper.AuthHelper;
import org.junit.jupiter.api.Test;

import io.quarkus.test.common.QuarkusTestResource;
import io.quarkus.test.junit.QuarkusTest;
import io.quarkus.test.oidc.server.OidcWiremockTestResource;
import io.restassured.filter.session.SessionFilter;
import io.restassured.http.ContentType;

@QuarkusTest
@QuarkusTestResource(OidcWiremockTestResource.class)
public class MembershipFormTest {
private static final String SAMPLE_FORM_UUID = "form-uuid";



    //
    // GET /form
    //
    @Test
    void getForms_requireAuth() {
        // auth is triggered before CSRF (as the request is dumped before it gets
        // processed)
        given().auth().none().when().get("/form").then().statusCode(401);
    }

    @Test
    void getForms_csrfGuard() {
        // happens after auth, once the request is processed
        given().auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet())).when().get("/form").then()
                .statusCode(403);
    }

    @Test
    void getForms_success() {
        SessionFilter sessionFilter = new SessionFilter();
        given().filter(sessionFilter).auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet()))
                .header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter)).when().get("/form").then()
                .statusCode(200);
    }

    @Test
    void getForms_success_format() {
        SessionFilter sessionFilter = new SessionFilter();
        given().filter(sessionFilter).auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet()))
                .header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter)).when().get("/form").then()
                .assertThat().body(matchesJsonSchemaInClasspath("schemas/membership-forms-schema.json"));
    }

    //
    // GET /form/{id}
    //
    @Test
    void getFormByID_requireAuth() {
        // auth is triggered before CSRF (as the request is dumped before it gets
        // processed)
        given().auth().none().when().get("/form/{id}", SAMPLE_FORM_UUID).then().statusCode(401);
    }

    @Test
    void getFormByID_csrfGuard() {
        // happens after auth, once the request is processed
        given().auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet())).when().get("/form/{id}", SAMPLE_FORM_UUID).then()
                .statusCode(403);
    }

    @Test
    void getFormByID_success() {
        SessionFilter sessionFilter = new SessionFilter();
        given().filter(sessionFilter).auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet()))
                .header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter)).when()
                .get("/form/{id}", SAMPLE_FORM_UUID).then().statusCode(200);
    }

    @Test
    void getFormByID_success_format() {
        SessionFilter sessionFilter = new SessionFilter();
        given().filter(sessionFilter).auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet()))
                .header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter)).when()
                .get("/form/{id}", SAMPLE_FORM_UUID).then().assertThat()
                .body(matchesJsonSchemaInClasspath("schemas/membership-form-schema.json"));
    }

    //
    // POST /form
    //
    @Test
    void postForm_requireAuth() {
        // auth is triggered after CSRF for non GET requests
        SessionFilter sessionFilter = new SessionFilter();
        given().filter(sessionFilter).header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter)).auth()
                .none().contentType(ContentType.JSON).body(generateSample(Optional.of(SAMPLE_FORM_UUID))).when().post("/form").then().statusCode(401);
    }

    @Test
    void postForm_csrfGuard() {
        // happens after auth, once the request is processed
        given().auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet())).contentType(ContentType.JSON)
                .body(generateSample(Optional.of(SAMPLE_FORM_UUID))).when().post("/form").then().statusCode(403);
    }

    @Test
    void postForm_success() {
        SessionFilter sessionFilter = new SessionFilter();
        given().filter(sessionFilter).auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet()))
                .header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter)).contentType(ContentType.JSON)
                .body(generateSample(Optional.of(SAMPLE_FORM_UUID))).when().post("/form").then().statusCode(200);
    }

    @Test
    void postForm_success_format() {
        SessionFilter sessionFilter = new SessionFilter();
        given().filter(sessionFilter).auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet()))
                .header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter)).contentType(ContentType.JSON)
                .body(generateSample(Optional.of(SAMPLE_FORM_UUID))).when().post("/form").then().assertThat()
                .body(matchesJsonSchemaInClasspath("schemas/membership-forms-schema.json"));
    }

    //
    // PUT /form/{id}
    //
    @Test
    void putFormByID_requireAuth() {
        // auth is triggered after CSRF for non GET requests
        SessionFilter sessionFilter = new SessionFilter();
        given().filter(sessionFilter).header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter)).auth()
                .none().contentType(ContentType.JSON).body(generateSample(Optional.of(SAMPLE_FORM_UUID))).when()
                .put("/form/{id}", SAMPLE_FORM_UUID).then().statusCode(401);
    }

    @Test
    void putFormByID_csrfGuard() {
        // happens after auth, once the request is processed
        given().auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet())).contentType(ContentType.JSON)
                .body(generateSample(Optional.of(SAMPLE_FORM_UUID))).when().put("/form/{id}", SAMPLE_FORM_UUID).then().statusCode(403);
    }

    @Test
    void putFormByID_empty() {
        SessionFilter sessionFilter = new SessionFilter();
        given().filter(sessionFilter).auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet()))
                .header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter)).contentType(ContentType.JSON)
                .when().put("/form/{id}", SAMPLE_FORM_UUID).then().statusCode(500);
    }
    @Test
    void putFormByID_success() {
        SessionFilter sessionFilter = new SessionFilter();
        given().filter(sessionFilter).auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet()))
                .header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter)).contentType(ContentType.JSON)
                .body(generateSample(Optional.empty())).when().put("/form/{id}", SAMPLE_FORM_UUID).then().statusCode(200);
    }

    @Test
    void putFormByID_success_format() {
        SessionFilter sessionFilter = new SessionFilter();
        given().filter(sessionFilter).auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet()))
                .header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter)).contentType(ContentType.JSON)
                .body(generateSample(Optional.of(SAMPLE_FORM_UUID))).when().get("/form/{id}", SAMPLE_FORM_UUID).then().assertThat()
                .body(matchesJsonSchemaInClasspath("schemas/membership-form-schema.json"));
    }

    @Test
    void deleteFormByID_requireAuth() {
        // auth is triggered after CSRF for non GET requests
        SessionFilter sessionFilter = new SessionFilter();
        given().filter(sessionFilter).header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter)).auth()
                .none().when()
                .delete("/form/{SAMPLE_FORM_UUID}", SAMPLE_FORM_UUID)
                .then().statusCode(401);
    }

    @Test
    void deleteFormByID_csrfGuard() {
        // happens after auth, once the request is processed
        given().auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet())).when().delete("/form/{id}", SAMPLE_FORM_UUID).then()
                .statusCode(403);
    }

    @Test
    void deleteFormByID_success() {
        SessionFilter sessionFilter = new SessionFilter();
        given().filter(sessionFilter).auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet()))
                .header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter)).when()
                .get("/form/{id}", SAMPLE_FORM_UUID).then().statusCode(200);
    }

    @Test
    void deleteFormByID_success_format() {
        SessionFilter sessionFilter = new SessionFilter();
        given().filter(sessionFilter).auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet()))
                .header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter)).when()
                .get("/form/{id}", SAMPLE_FORM_UUID).then().assertThat().body(matchesJsonSchemaInClasspath("schemas/membership-form-schema.json"));
    }

    private MembershipForm generateSample(Optional<String> id) {
        MembershipForm out = new MembershipForm();
        id.ifPresent(out::setId);
        out.setMembershipLevel("sample");
        out.setPurchaseOrderRequired("no");
        out.setRegistrationCountry("CA");
        out.setSigningAuthority(false);
        out.setVatNumber("123456789");
        out.setUserID("sample_user");
        return out;
    }
}
