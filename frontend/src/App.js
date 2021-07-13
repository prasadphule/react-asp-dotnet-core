import Header from 'layout/Header'
import Footer from 'layout/Footer'
import NotFound from 'layout/NotFound'
import ObjectTypeList from 'features/objectType/ObjectTypeList'
import ObjectTypeForm from 'features/objectType/ObjectTypeForm'
import { Switch, Route } from 'react-router-dom'
import Spinner from 'layout/Spinner'

function App() {
  return (
    <div className="col-lg-8 mx-auto p-3 py-md-5">
      <Header />
      <main>
        <Switch>
          <Route exact path="/">
            <ObjectTypeList />
          </Route>
          <Route exact path={["/add", "/edit/:id"]}>
            <ObjectTypeForm />
          </Route>
          <Route exact path="*">
            <NotFound />
          </Route>
        </Switch>
      </main>
      <Spinner />
      <Footer />
    </div>
  );
}

export default App;
