import React from "react";
import { Site, Nav } from "tabler-react";
import { Props as UserAccountProps } from "components/AccountDropdown/AccountDropdown";

interface HeaderProps {
  user?: UserAccountProps;
  isAnon?: boolean;
}
interface HeaderState {
  user?: UserAccountProps;
}

const standardUserOptions = [
  { icon: "user", value: "Profile" },
  { icon: "settings", value: "Settings" },
  { icon: "send", value: "Message" },
  { isDivider: true },
  { icon: "help-circle", value: "Need help?" },
  { icon: "log-out", value: "Sign out" },
];

class Header extends React.Component<HeaderProps, HeaderState> {
  constructor(props: HeaderProps) {
    super(props);
    this.state = {
      user: props.user
    };
  }

  componentDidMount() {
    // set initial test user (we'll properly mount this later')
    if (this.props.isAnon) {
      this.setState({
        user: {
          name: "Anonymous",
          description: "Anonymous user",
          options: standardUserOptions
        }
      });
    } else {
      this.setState({
        user: {
          avatarURL: "./demo/faces/female/25.jpg",
          name: "Jane Pearson",
          description: "Administrator",
          options: standardUserOptions
        }
      });
    }
  }

  render() {
    return (
      <Site.Header
        href="/"
        alt="Eclipse Foundation"
        imageURL="https://eclipse.org/artwork/images/v2/eclipse_foundation_logo.jpg"
        navItems={
          [<Nav.Item href="https://www.eclipse.org/projects/">
            Projects
        </Nav.Item>,
          <Nav.Item href="https://www.eclipse.org/org/workinggroups/">
            Working Groups
        </Nav.Item>]
        }
        accountDropdown={this.state.user}
      />
    );
  }
}
export default Header;