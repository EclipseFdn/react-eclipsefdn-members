package org.eclipsefoundation.react.resources;

import static io.restassured.RestAssured.given;
import static io.restassured.module.jsv.JsonSchemaValidator.matchesJsonSchemaInClasspath;

import java.util.Collections;
import java.util.Optional;

import javax.json.bind.Jsonb;

import org.eclipsefoundation.core.config.JsonBConfig;
import org.eclipsefoundation.core.helper.CSRFHelper;
import org.eclipsefoundation.react.model.MembershipForm;
import org.eclipsefoundation.react.test.helper.AuthHelper;
import org.eclipsefoundation.react.test.helper.SchemaNamespaceHelper;
import org.hamcrest.text.IsEmptyString;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

import io.quarkus.test.common.QuarkusTestResource;
import io.quarkus.test.junit.QuarkusTest;
import io.quarkus.test.oidc.server.OidcWiremockTestResource;
import io.restassured.filter.session.SessionFilter;
import io.restassured.http.ContentType;

@QuarkusTest
@QuarkusTestResource(OidcWiremockTestResource.class)
public class MembershipFormResourceTest {
    public static final String SAMPLE_FORM_UUID = "form-uuid";
    public static final String FORMS_BASE_URL = "/form";
    public static final String FORMS_BY_ID_URL = FORMS_BASE_URL + "/{id}";
    // JSONB object instantiated using config (rather than generic instance)
    private static Jsonb jsonb;

    @BeforeAll
    public static void init() {
        // following strategy is defined as default by internal API guidelines
        jsonb = new JsonBConfig().getContext(Void.class);
    }

    //
    // GET /form
    //
    @Test
    void getForms_requireAuth() {
        // auth is triggered before CSRF (as the request is dumped before it gets
        // processed)
        given().auth().none().when().get(FORMS_BASE_URL).then().statusCode(401);
    }

    @Test
    void getForms_csrfGuard() {
        // happens after auth, once the request is processed
        given().auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet())).when().get(FORMS_BASE_URL).then()
                .statusCode(403);
    }

    @Test
    void getForms_success() {
        SessionFilter sessionFilter = new SessionFilter();
        given().filter(sessionFilter).auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet()))
                .header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter)).when().get(FORMS_BASE_URL)
                .then().statusCode(200);
    }

    @Test
    void getForms_success_format() {
        SessionFilter sessionFilter = new SessionFilter();
        given().filter(sessionFilter).auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet()))
                .header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter)).when().get(FORMS_BASE_URL)
                .then().assertThat()
                .body(matchesJsonSchemaInClasspath(SchemaNamespaceHelper.MEMBERSHIP_FORMS_SCHEMA_PATH));
    }

    //
    // GET /form/{id}
    //
    @Test
    void getFormByID_requireAuth() {
        // auth is triggered before CSRF (as the request is dumped before it gets
        // processed)
        given().auth().none().when().get(FORMS_BY_ID_URL, SAMPLE_FORM_UUID).then().statusCode(401);
    }

    @Test
    void getFormByID_csrfGuard() {
        // happens after auth, once the request is processed
        given().auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet())).when()
                .get(FORMS_BY_ID_URL, SAMPLE_FORM_UUID).then().statusCode(403);
    }

    @Test
    void getFormByID_success() {
        SessionFilter sessionFilter = new SessionFilter();
        given().filter(sessionFilter).auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet()))
                .header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter)).when()
                .get(FORMS_BY_ID_URL, SAMPLE_FORM_UUID).then().statusCode(200);
    }

    @Test
    void getFormByID_success_format() {
        SessionFilter sessionFilter = new SessionFilter();
        given().filter(sessionFilter).auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet()))
                .header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter)).when()
                .get(FORMS_BY_ID_URL, SAMPLE_FORM_UUID).then().assertThat()
                .body(matchesJsonSchemaInClasspath(SchemaNamespaceHelper.MEMBERSHIP_FORM_SCHEMA_PATH));

        given().filter(sessionFilter).auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet()))
                .header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter)).when()
                .get(FORMS_BY_ID_URL, SAMPLE_FORM_UUID).then().statusCode(200);
        given().filter(sessionFilter).auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet()))
                .header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter)).accept(ContentType.JSON)
                .when().get(FORMS_BY_ID_URL, SAMPLE_FORM_UUID).then().statusCode(200);

        given().filter(sessionFilter).auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet()))
                .header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter)).accept(ContentType.XML)
                .when().get(FORMS_BY_ID_URL, SAMPLE_FORM_UUID).then().statusCode(500);
        given().filter(sessionFilter).auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet()))
                .header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter)).accept(ContentType.TEXT)
                .when().get(FORMS_BY_ID_URL, SAMPLE_FORM_UUID).then().statusCode(500);
    }

    //
    // POST /form
    //
    @Test
    void postForm_requireAuth() {
        // auth is triggered after CSRF for non GET requests
        SessionFilter sessionFilter = new SessionFilter();
        given().filter(sessionFilter).header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter)).auth()
                .none().contentType(ContentType.JSON).body(generateSample(Optional.of(SAMPLE_FORM_UUID))).when()
                .post(FORMS_BASE_URL).then().statusCode(401);
    }

    @Test
    void postForm_csrfGuard() {
        // happens after auth, once the request is processed
        given().auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet())).contentType(ContentType.JSON)
                .body(generateSample(Optional.of(SAMPLE_FORM_UUID))).when().post(FORMS_BASE_URL).then().statusCode(403);
    }

    @Test
    void postForm_success() {
        SessionFilter sessionFilter = new SessionFilter();
        given().filter(sessionFilter).auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet()))
                .header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter))
                .contentType(ContentType.JSON).body(generateSample(Optional.of(SAMPLE_FORM_UUID))).when()
                .post(FORMS_BASE_URL).then().statusCode(200);
    }

    @Test
    void postForm_success_pushFormat() {
        // Check that the input matches what is specified in spec
        String json = generateSample(Optional.of(SAMPLE_FORM_UUID));
        Assertions.assertTrue(
                matchesJsonSchemaInClasspath(SchemaNamespaceHelper.MEMBERSHIP_FORM_PUSH_SCHEMA_PATH).matches(json));
        // json format
        SessionFilter sessionFilter = new SessionFilter();
        given().filter(sessionFilter).auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet()))
                .header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter)).body(json)
                .contentType(ContentType.JSON).when().post(FORMS_BASE_URL).then().statusCode(200);

        given().filter(sessionFilter).auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet()))
                .header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter)).body(json).when()
                .post(FORMS_BASE_URL).then().statusCode(500);
        given().filter(sessionFilter).auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet()))
                .header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter))
                .contentType(ContentType.TEXT).body(json).when().post(FORMS_BASE_URL).then().statusCode(500);
        given().filter(sessionFilter).auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet()))
                .header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter))
                .contentType(ContentType.XML).body(json).when().post(FORMS_BASE_URL).then().statusCode(500);
    }

    @Test
    void postForm_success_format() {
        SessionFilter sessionFilter = new SessionFilter();
        given().filter(sessionFilter).auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet()))
                .header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter))
                .contentType(ContentType.JSON).body(generateSample(Optional.of(SAMPLE_FORM_UUID))).when()
                .post(FORMS_BASE_URL).then().assertThat()
                .body(matchesJsonSchemaInClasspath(SchemaNamespaceHelper.MEMBERSHIP_FORMS_SCHEMA_PATH));

        given().filter(sessionFilter).auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet()))
                .header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter))
                .body(generateSample(Optional.of(SAMPLE_FORM_UUID))).when().post(FORMS_BASE_URL).then().assertThat()
                .statusCode(500);
        given().filter(sessionFilter).auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet()))
                .header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter))
                .contentType(ContentType.TEXT).body(generateSample(Optional.of(SAMPLE_FORM_UUID))).when()
                .post(FORMS_BASE_URL).then().statusCode(500);
        given().filter(sessionFilter).auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet()))
                .header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter))
                .contentType(ContentType.XML).body(generateSample(Optional.of(SAMPLE_FORM_UUID))).when()
                .post(FORMS_BASE_URL).then().statusCode(500);
    }

    //
    // PUT /form/{id}
    //
    @Test
    void putFormByID_requireAuth() {
        // auth is triggered after CSRF for non GET requests
        SessionFilter sessionFilter = new SessionFilter();
        given().filter(sessionFilter).header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter)).auth()
                .none().contentType(ContentType.JSON).accept(ContentType.JSON)
                .body(generateSample(Optional.of(SAMPLE_FORM_UUID))).when().put(FORMS_BY_ID_URL, SAMPLE_FORM_UUID)
                .then().statusCode(401);
    }

    @Test
    void putFormByID_csrfGuard() {
        // happens after auth, once the request is processed
        given().auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet())).contentType(ContentType.JSON)
                .accept(ContentType.JSON).body(generateSample(Optional.of(SAMPLE_FORM_UUID))).when()
                .put(FORMS_BY_ID_URL, SAMPLE_FORM_UUID).then().statusCode(403);
    }

    @Test
    void putFormByID_empty() {
        SessionFilter sessionFilter = new SessionFilter();
        given().filter(sessionFilter).auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet()))
                .header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter))
                .contentType(ContentType.JSON).accept(ContentType.JSON).when().put(FORMS_BY_ID_URL, SAMPLE_FORM_UUID)
                .then().statusCode(500);
    }

    @Test
    void putFormByID_success() {
        SessionFilter sessionFilter = new SessionFilter();
        given().filter(sessionFilter).auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet()))
                .header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter))
                .body(generateSample(Optional.empty())).contentType(ContentType.JSON).when()
                .put(FORMS_BY_ID_URL, SAMPLE_FORM_UUID).then().statusCode(200);
    }

    @Test
    void putFormByID_success_pushFormat() {
        // Check that the input matches what is specified in spec
        String json = generateSample(Optional.of(SAMPLE_FORM_UUID));
        Assertions.assertTrue(
                matchesJsonSchemaInClasspath(SchemaNamespaceHelper.MEMBERSHIP_FORM_PUSH_SCHEMA_PATH).matches(json));

        SessionFilter sessionFilter = new SessionFilter();
        given().filter(sessionFilter).auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet()))
                .header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter))
                .contentType(ContentType.JSON).accept(ContentType.JSON).body(json).when()
                .put(FORMS_BY_ID_URL, SAMPLE_FORM_UUID).then().statusCode(200);
        given().filter(sessionFilter).auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet()))
                .header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter))
                .contentType(ContentType.JSON).body(json).when().put(FORMS_BY_ID_URL, SAMPLE_FORM_UUID).then()
                .statusCode(200);

        given().filter(sessionFilter).auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet()))
                .header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter))
                .contentType(ContentType.TEXT).body(json).when().put(FORMS_BY_ID_URL, SAMPLE_FORM_UUID).then()
                .statusCode(500);
        given().filter(sessionFilter).auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet()))
                .header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter))
                .contentType(ContentType.XML).body(json).when().put(FORMS_BY_ID_URL, SAMPLE_FORM_UUID).then()
                .statusCode(500);
    }

    @Test
    void putFormByID_success_format() {
        // Check that the output matches what is specified in spec
        SessionFilter sessionFilter = new SessionFilter();
        given().filter(sessionFilter).auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet()))
                .header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter))
                .contentType(ContentType.JSON).accept(ContentType.JSON)
                .body(generateSample(Optional.of(SAMPLE_FORM_UUID))).when().put(FORMS_BY_ID_URL, SAMPLE_FORM_UUID)
                .then().body(matchesJsonSchemaInClasspath(SchemaNamespaceHelper.MEMBERSHIP_FORMS_SCHEMA_PATH))
                .statusCode(200);
        given().filter(sessionFilter).auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet()))
                .header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter))
                .contentType(ContentType.JSON).body(generateSample(Optional.of(SAMPLE_FORM_UUID))).when()
                .put(FORMS_BY_ID_URL, SAMPLE_FORM_UUID).then()
                .body(matchesJsonSchemaInClasspath(SchemaNamespaceHelper.MEMBERSHIP_FORMS_SCHEMA_PATH)).statusCode(200);
        // asserts content type of output for integrity
        given().filter(sessionFilter).auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet()))
                .header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter))
                .contentType(ContentType.JSON).accept(ContentType.TEXT)
                .body(generateSample(Optional.of(SAMPLE_FORM_UUID))).when().put(FORMS_BY_ID_URL, SAMPLE_FORM_UUID)
                .then().statusCode(500);
        given().filter(sessionFilter).auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet()))
                .header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter))
                .contentType(ContentType.JSON).accept(ContentType.XML)
                .body(generateSample(Optional.of(SAMPLE_FORM_UUID))).when().put(FORMS_BY_ID_URL, SAMPLE_FORM_UUID)
                .then().statusCode(500);
    }

    @Test
    void deleteFormByID_requireAuth() {
        // auth is triggered after CSRF for non GET requests
        SessionFilter sessionFilter = new SessionFilter();
        given().filter(sessionFilter).header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter)).auth()
                .none().when().delete("/form/{SAMPLE_FORM_UUID}", SAMPLE_FORM_UUID).then().statusCode(401);
    }

    @Test
    void deleteFormByID_csrfGuard() {
        // happens after auth, once the request is processed
        given().auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet())).when()
                .delete(FORMS_BY_ID_URL, SAMPLE_FORM_UUID).then().statusCode(403);
    }

    @Test
    void deleteFormByID_success() {
        SessionFilter sessionFilter = new SessionFilter();
        given().filter(sessionFilter).auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet()))
                .header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter)).when()
                .delete(FORMS_BY_ID_URL, SAMPLE_FORM_UUID).then().statusCode(200);
    }

    @Test
    void deleteFormByID_success_format() {
        SessionFilter sessionFilter = new SessionFilter();
        given().filter(sessionFilter).auth().oauth2(AuthHelper.getAccessToken(Collections.emptySet()))
                .header(CSRFHelper.CSRF_HEADER_NAME, AuthHelper.getCSRFValue(sessionFilter)).when()
                .delete(FORMS_BY_ID_URL, SAMPLE_FORM_UUID).then().assertThat().body(IsEmptyString.emptyString());
    }

    private String generateSample(Optional<String> id) {
        MembershipForm out = new MembershipForm();
        id.ifPresent(out::setId);
        out.setMembershipLevel("sample");
        out.setPurchaseOrderRequired("no");
        out.setRegistrationCountry("CA");
        out.setSigningAuthority(false);
        out.setVatNumber("123456789");
        out.setUserID("sample_user");
        return MembershipFormResourceTest.jsonb.toJson(out);
    }
}
