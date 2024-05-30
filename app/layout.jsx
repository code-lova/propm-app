import '@styles/globals.css';
import Nav from '@components/Nav';
import Provider from '@components/Provider';

export const metaData = {
    title: "Promptopia",
    description: "Discover and Share A.I Prompts"
}

const RootLayout = ({ children }) => {
  return (
    <html lang='eng'>
        <body>
            <Provider>
                <div className='main'>
                    <div className='gradient'></div>
                </div> 

                <main className='app'>
                    <Nav />
                    {children}
                </main>   
            </Provider>        
        </body>
    </html>
  )
}

export default RootLayout;