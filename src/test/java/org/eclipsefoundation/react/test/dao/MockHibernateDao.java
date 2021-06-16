package org.eclipsefoundation.react.test.dao;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.annotation.PostConstruct;
import javax.enterprise.context.ApplicationScoped;

import org.eclipse.microprofile.health.HealthCheckResponse;
import org.eclipsefoundation.persistence.dao.PersistenceDao;
import org.eclipsefoundation.persistence.dto.BareNode;
import org.eclipsefoundation.persistence.model.RDBMSQuery;
import org.eclipsefoundation.react.model.MembershipForm;
import org.eclipsefoundation.react.test.helper.AuthHelper;

import io.quarkus.test.Mock;

/**
 * To keep tests separate from datastore, set up a dummy endpoint that returns copies of static data.
 *
 * @author Martin Lowe
 */
@Mock
@ApplicationScoped
public class MockHibernateDao implements PersistenceDao {
    private Map<Class<?>, List<? extends BareNode>> mockData;

    // allow query to be captured and exposed for test validation
    public RDBMSQuery<?> capturedQuery;

    /** Set up mock data so that different types will return basic stub data */
    @PostConstruct
    public void init() {
        this.mockData = new HashMap<>();
        MembershipForm mf = new MembershipForm();
        mf.setId("form-uuid");
        mf.setUserID(AuthHelper.TEST_USER_NAME);
        mf.setMembershipLevel("sample");
        mf.setSigningAuthority(Math.random() > 0.5);
        mockData.put(MembershipForm.class, Arrays.asList(mf));

    }

    @Override
    public <T extends BareNode> List<T> get(RDBMSQuery<T> q) {
        capturedQuery = q;
        // if this is ever wrong, then there was bad mock data
        @SuppressWarnings("unchecked")
        List<T> o = (List<T>) mockData.get(q.getDocType());
        if (o != null) {
            return new ArrayList<>(o);
        }
        return Collections.emptyList();
    }

    @Override
    public <T extends BareNode> List<T> add(RDBMSQuery<T> q, List<T> documents) {
        capturedQuery = q;
        mockData.put(q.getDocType(), documents);
        return documents;
    }

    @Override
    public Long count(RDBMSQuery<?> q) {
        capturedQuery = q;

        return 0L;
    }

    @Override
    public <T extends BareNode> void delete(RDBMSQuery<T> q) {
        capturedQuery = q;
    }

    @Override
    public HealthCheckResponse call() {
        return null;
    }

    @Override
    public <T extends BareNode> T getReference(Object id, Class<T> type) {
        return null;
    }
}
