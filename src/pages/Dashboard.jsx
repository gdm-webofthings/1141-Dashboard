
import { Switch, Route } from "react-router-dom";

import { Actions } from "../components/Actions/Actions";
import { Chat } from "../components/Chat/Chat";
import { Detail } from "../components/Detail/Detail";
import { Progress } from "../components/Progress/Progress";

export const Dashboard = () => {
  return (

    <Switch>
      <Route path="/">
        <div className="interactive__container">
          <Progress />
          <Actions />
          <Detail />
          <Chat />
        </div>
      </Route>
    </Switch>
  );
};
