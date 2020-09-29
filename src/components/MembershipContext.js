import React from "react";

const MembershipContext = React.createContext({
    isExistingMember: false,
    setIsExistingMember: () => {}
});

export default MembershipContext