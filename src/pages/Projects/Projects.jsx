import Navigation from "../../components/Navigation/Navigation";
import Footer from "../../components/Footer/Footer";
import '../../styles/global.scss'

export default function Dashboard() {
        return (
          <>
          <div className="screen">
          <Navigation />
          <div className="screen__content">
          </div>
          </div>
          <Footer />
          </>
        );
      }