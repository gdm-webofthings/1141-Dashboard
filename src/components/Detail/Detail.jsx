import { Route, Switch, Redirect } from 'react-router-dom';
import useData from '../../core/hooks/useData';
import { ClientDetail } from '../../pages/templates/ClientDetail';
import { LightController } from '../Light/LightController';

export const Detail = () => {
  // Get data from context
  const { data } = useData();

  return (
    <div className="detail__container">
      <Switch>
        {/* Default screen client */}
        <Route path={`/Client-00`}>
          <ClientDetail data={data.clients[0]} noHeader />
        </Route>

        {/* Light controller */}
        <Route path="/light">
          <LightController />
        </Route>

        {/* Create a separate component for each client*/}
        {data.clients.slice(1).map((client, index) => (
          <Route path={`/${client.id}`} key={index}>
            <ClientDetail data={client} />
          </Route>
        ))}
        {data.clients.length === 0 ? (
          <Route path="/"></Route>
        ) : (
          <Route path="/">
            {/* Redirect to first client in the array */}
            <Redirect to={`/${data.clients[0]?.id}`} />
          </Route>
        )}
      </Switch>
    </div>
  );
};
