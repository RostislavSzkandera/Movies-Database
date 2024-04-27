

const Help = () => {
  return (
    <section className="flex flex-col pt-8  justify-center items-center">
        <div className="flex flex-col text-center mx-2 w-[300px] sm:w-[400px]">
          <h2 className="text-3xl mb-8">Nápověda</h2>
          <p className="mb-8">Toto je projekt do mého portfolia. Jedná se o databázi filmů. Využívanými technologiemi jsou: React, Tailwind,
            Firebase.
          </p>
          <h2 className="text-red-500 text-xl mb-2">Pro nepřihlášené</h2>
          <p className="mb-8">Pokud nejste přihlášení, můžete si na úvodní straně prohlédnout, 
            jaké filmy v databázi jsou. Můžete se registrovat a přihlásit pomocí emailu a hesla,
            a nebo pomocí Google.
          </p>
          <h2 className="text-yellow-500 text-xl mb-2">Pro přihlášené</h2>
          <p className="mb-2">Pokud jste přihlášení, můžete si také prohlédnout databázi filmů a 
            otevřít detailnější informace o filmu. Můžete přidat nový film,
            můžete smazat film, který jste přidali vy. Film, který jste přidali vy,
            je v detailním popisu žlutý a film, který přidal někdo jiný je červený.
          </p>
    </div>
    </section>
  )
}

export default Help
