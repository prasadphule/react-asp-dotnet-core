import Header from './layout/Header'
import Footer from './layout/Footer'
import NotFound from './layout/NotFound'
import ObjectTypeList from './objectType/ObjectTypeList'
import ObjectTypeForm from './objectType/ObjectTypeForm'
import { Switch, Route } from 'react-router-dom'

function App() {
  return (
    <div className="col-lg-8 mx-auto p-3 py-md-5">
      <Header />
      <main>
        <Switch>
          <Route exact path="/">
            <ObjectTypeList />
          </Route>
          <Route path="/add">
            <ObjectTypeForm />
          </Route>
          <Route path="/edit/:id">
            <ObjectTypeForm />
          </Route>
          <Route exact path="*">
            <NotFound />
          </Route>
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

export default App;
