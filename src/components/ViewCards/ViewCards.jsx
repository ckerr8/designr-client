import '../../styles/global.scss'
import './ViewCards.scss'

export default function ViewCards() {
    return (
        <>

      <section>
        <h1>Welcome back Lover 💞</h1>

        <div className="wrap">
          <div className="wrap__views">
            <div className="wrap__views--container">
              
              <div className="wrap__views--item">
                <h2>Projects</h2>
                <div>
                  <h3>View all</h3>
                </div>
              </div>

              <div className="wrap__views--item">
                <h2>Assets</h2>
                <div>
                  <h3>View all</h3>
                </div>
              </div>

              <div className="wrap__views--item">
                <h2>Clients</h2>
                <div>
                  <h3>View all</h3>
                </div>
              </div>
            </div>

            <div className="wrap__views--tasks">
              <div>
                <h2>Task List</h2>
                <div className='tasks'>
                  <p>Task 1</p>
                </div>
                <div className='tasks'>
                  <p>Task 2</p>
                </div>
                <div className='tasks'>
                  <p>Task 3</p>
                </div>
                <div className='tasks'>
                  <p>Task 4</p>
                </div>
              </div>
            </div>
          </div>

          <div className="wrap__deadlines">
            <div className="wrap__deadlines--inner">
              <h2> Upcoming Deadlines</h2>
              <div className='deadline'>
                <p>Instock Logo</p>
              </div>

              <div className='deadline'>
                <p>Brainflix Landing page</p>
              </div>

              <div className='deadline'>
                <p>Nitro Coffee Menu</p>
              </div>

              <div className='deadline'>
                <p>Cinimaticats Reels</p>
              </div>
              <div className='deadline'>
                <p>Cinimaticats Reels</p>
              </div>
              <div className='deadline'>
                <p>Cinimaticats Reels</p>
              </div>
              <div className='deadline'>
                <p>Cinimaticats Reels</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      </>
        )
}