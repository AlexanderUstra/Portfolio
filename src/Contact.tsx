import { useState } from "react";
import emailjs from 'emailjs-com';
import './animations.css'
interface ContactProps {
  language: string
}
const textEs = {
  title:'Contacto',
  texarea: 'Mensaje',
  button: 'Enviar',
  confirmation:'Se ha enviado el Mensaje'
}
const textEn = {
  title:'Contact',
  texarea: 'Mesagge',
  button: 'Send',
  confirmation:'Message has been sended'
}

export const Contact: React.FC<ContactProps> = ({language}) => {

  const textToUse = language === 'Es' ? textEs : textEn

    const [formData, setFormData] = useState({
        email: '',
        message: ''
      });
    
      const handleChange = (e:any) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });
      };
      
      const handleSubmit = (e:any) => {
        e.preventDefault();
    
        emailjs
          .send(
            'service_ulrlgd4', 
            'template_u8kous9',  
            {
              email: formData.email,
              message: formData.message,
            },
            'lE9hec2Lnx1B-4Kqt'
          )
          .then(
            (result) => {
              console.log('Correo enviado con éxito:', result.text);
              setModal(true)
              setInitialized(true)
            },
            (error) => {
              console.log('Error al enviar el correo:', error.text);
            }
          );
      };
      
      const [modal,setModal] = useState(false)
      const [initialized,setInitialized] = useState(false)
  
      const Modal = ()=> {
        setTimeout(()=>{
          setModal(false)
        },1500)
          return (
              <div className={!initialized
                  ? "confirmationModalHidden"
                  : modal
                  ? "confirmationModal"
                  : "confirmationModalOff"} onClick={()=>setModal(false)}>
                  <h3>{textToUse.confirmation}</h3>
              </div>
          )
      }
      return (
        <form onSubmit={handleSubmit}>
          <Modal/>
          <h1>{textToUse.title}</h1>
          <input
            required
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <textarea
            required
            name="message"
            id="message"
            placeholder={textToUse.texarea}
            value={formData.message}
            onChange={handleChange}
          ></textarea>
          <button type="submit">{textToUse.button}</button>
        </form>
      );
}