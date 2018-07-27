import * as i18n from 'i18next';
import * as LanguageDetector from 'i18next-browser-languagedetector';

i18n.use(LanguageDetector).init({
    resources:{
        en:{
            translations:{
                "Select your Language": "Select your Language",
                "English":"English",
                'Espanol':"Español",
                "Home":"Home",
                "Register":"Register",
                "LogIn":"Login",
                "Dashboard":"Dashboard",
                "Conversation":"Conversation",
                "Add Contacts":"Add Contacts",
                "Select Language": "Select Language",
                "Save": "Save",
                "Send":"Send",
                "Username":"Username",
                "Email":"Email",
                "Password":"Password",
                "Confirm Password": "Confirm Password",
                "Select from the avaialable Contacts":"Select from the avaialable Contacts",
                "Search":"Search",
                "Please insert email to look for contacts":"Please insert email to look for contacts",
                "Add Contact":"Add Contact",
            }
        },
        es:{
            translations:{
                "Select your Language": "Seleccione lenguage",
                "English":"English",
                'Espanol':"Español",
                "Home":"Principal",
                "Register":"Registrarse",
                "LogIn":"Inic. Sesion",
                "Dashboard":"Tablero",
                "Conversation":"Conversar",
                "Add Contacts":"Agregar Contacto",
                "Select Language": "Elegir Idioma",
                "Save": "Guardar",
                "Send":"Enviar",
                "Username":"Usuario",
                "Email":"Correo",
                "Password":"Contraseña",
                "Confirm Password": "Confirme Contra.",
                "Select from the avaialable Contacts":"Seleccione entre los contactos disponibles",
                "Search":"Buscar",
                "Please insert email to look for contacts": "Por favor inserte un email para buscar contactos",
                "Add Contact":"Agregar",
            }
        }
    },
    fallbackLng:'en',
    debug:true,
    ns:['translations'],
    defaultNS:'translations',
    keySeparator:false,
    interpolation:{
        formatSeparator:','
    },
    react:{
        wait:false,
        // bindI18n: 'languageChanged loaded',
        // bindStore: 'added removed'
    }
})

export default i18n 