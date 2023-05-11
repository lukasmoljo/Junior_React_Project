import dog from "../assets/dog.jpg";
import './About.css';
import Contact from "./ContactForm";

import Header from "./Header";

const About = () => {

    return(
        
        <div>
            <Header/>
            <img src={dog} alt="dog" className="dog" />
            <p className="hello">Dobrodošli na stranicu azila za udomljavanje malenih životinja kojima je potrebna briga i ljubav koju će oni zasigurno
                i uzvratiti. Azil se nalazi u Splitu, međutim udomljavanje se odobrava za sve lokacije unutar Republike Hrvatske. Azil je osnovan 
                2007. godine te je od tada udomljeno preko 2000 životinja. Ispod se nalazi karta gdje možete saznati kako do nas 
                te kontakt forma s kojom nam možete poslati upit
            </p>
            
            <Contact/>
            
            

            
        </div>
    )
}
export default About;