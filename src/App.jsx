import "./App.scss";

function App() {
  return (

    <div className="screen">
      <header className="screen__header">
        <nav className="nav">
          <ul className="nav__ul">
            <li className="nav__ul--li">Projects</li>
            <li className="nav__ul--li">Assets</li>
            <li className="nav__ul--li">Clients</li>
          </ul>
        </nav>
      </header>

      <div className="screen__content">
      <section>
        <h1>Welcome back Lover 💞</h1>

        <div className="wrap">
          <div className="wrap__views">
            <div className="wrap__views--container">
              
              <div className="wrap__views--projects">
                <h2>Projects</h2>
                <div>
                  <h3>View all</h3>
                </div>
              </div>

              <div className="wrap__views--assets">
                <h2>Assets</h2>
                <div>
                  <h3>View all</h3>
                </div>
              </div>

              <div className="wrap__views--clients">
                <h2>Clients</h2>
                <div>
                  <h3>View all</h3>
                </div>
              </div>
            </div>

            <div className="wrap__views--tasks">
              <div>
                <h2>Task List</h2>
                <div>
                  <p>Task 1</p>
                </div>
                <div>
                  <p>Task 2</p>
                </div>
                <div>
                  <p>Task 3</p>
                </div>
                <div>
                  <p>Task 4</p>
                </div>
              </div>
            </div>
          </div>

          <div className="wrap__deadlines">
            <div className="wrap__deadlines--inner">
              <h2> Upcoming Deadlines</h2>
              <div>
                <p>Instock Logo</p>
              </div>

              <div>
                <p>Brainflix Landing page</p>
              </div>
              <div>
                <p>Nitro Coffee Menu</p>
              </div>

              <div>
                <p>Cinimaticats Reels</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="feed">
        <h2>Inspiration</h2>
        <div className="feed__items">

          <div className="feed__items--box">
            <h3>Insp generator</h3>

          </div>
          
          <div className="feed__items--box">

            <h3>Insp generator</h3>
          </div>
          
          <div className="feed__items--box">
            <h3>Insp generator</h3>

          </div>

        </div>
      </section>
    </div>
    </div>
  );
}

export default App;
