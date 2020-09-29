import React, { useState } from "react";
import MembershipContext from "./MembershipContext";

const MembershipProvider = ({ children }) => {

    const [isExistingMember, setIsExistingMember] = useState(false)

    // useEffect(() => {
        // If has login data, can put here to set if is existing member
    // })

    return (
        <MembershipContext.Provider value={{
            isExistingMember,
            setIsExistingMember: (val) => setIsExistingMember(val)
        }}>
            {children}
        </MembershipContext.Provider>
    )

}

export default MembershipProvider