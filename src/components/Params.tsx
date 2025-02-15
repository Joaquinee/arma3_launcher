export default function Params() {
  return (
    <main className="flex-grow container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-6">Paramètres</h1>

      <div className="space-y-6">
        {/* Section Jeu */}
        <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Paramètres du jeu</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Répertoire d'installation d'Arma 3
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded dark:bg-gray-700"
                placeholder="C:\Program Files (x86)\Steam\steamapps\common\Arma 3"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Arguments de lancement
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded dark:bg-gray-700"
                placeholder="-skipIntro -noSplash -world=empty"
              />
            </div>
          </div>
        </section>

        {/* Section Performance */}
        <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Performance</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Mémoire maximale (Mo)
              </label>
              <input
                type="number"
                className="w-full p-2 border rounded dark:bg-gray-700"
                placeholder="8192"
              />
            </div>

            <div className="flex items-center">
              <input type="checkbox" id="useHT" className="mr-2" />
              <label htmlFor="useHT" className="text-sm font-medium">
                Utiliser l'Hyper-Threading
              </label>
            </div>
          </div>
        </section>

        {/* Bouton de sauvegarde */}
        <div className="flex justify-end">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
            Sauvegarder les paramètres
          </button>
        </div>
      </div>
    </main>
  );
}
