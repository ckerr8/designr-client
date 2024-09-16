import Navigation from "../../components/Navigation/Navigation";
import Footer from "../../components/Footer/Footer";
import '../../styles/global.scss'
import Feed from "../../components/Feed/Feed";
import ViewCards from "../../components/ViewCards/ViewCards";


export default function Dashboard() {
        return (
          <>
          <div className="screen">
          <Navigation />
          <div className="screen__content">
          <ViewCards />
          <Feed />
          </div>
          </div>
          <Footer />
          </>
        );
      }