import Navigation from "../../components/Navigation/Navigation";
import Footer from "../../components/Footer/Footer";
import '../../styles/global.scss'
import { Card, Image, Header } from 'semantic-ui-react';
import './Projects.scss'

export default function Dashboard() {
        return (
          <>
          <div className="screen">
          <Navigation />
          <div className="screen__content">
          <Card className="wrap">
            <Image className="wrap__img" src="../../src/assets/images/bold.png"></Image>
            <Header>
            Card</Header>
            </Card>
            <Card className="wrap">
            <Image className="wrap__img" src="../../src/assets/images/bold.png"></Image>
            <Header>
            Card</Header>
            </Card>
            <Card className="wrap">
            <Image className="wrap__img" src="../../src/assets/images/bold.png"></Image>
            <Header>
            Card</Header>
            </Card>
            <Card className="wrap">
            <Image className="wrap__img" src="../../src/assets/images/bold.png"></Image>
            <Header>
            Card</Header>
            </Card>
          </div>
          </div>
          <Footer />
          </>
        );
      }