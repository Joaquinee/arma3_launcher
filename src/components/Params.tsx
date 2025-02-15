export default function Params() {
  return (
    <main className="flex-grow container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-6 ">Paramètres</h1>

      <div className="space-y-6">
        {/* Section Jeu */}
        <section className="bg-black/33 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-white/80">
            Paramètres du jeu
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-white/70">
                Répertoire d'installation d'Arma 3
              </label>
              <input
                type="text"
                className="w-full p-2 bg-black/25 border border-white/10 rounded text-white/90 placeholder-white/40 focus:outline-none focus:border-white/30 transition-colors duration-200"
                placeholder="C:\Program Files (x86)\Steam\steamapps\common\Arma 3"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-white/70">
                Arguments de lancement
              </label>
              <input
                type="text"
                className="w-full p-2 bg-black/25 border border-white/10 rounded text-white/90 placeholder-white/40 focus:outline-none focus:border-white/30 transition-colors duration-200"
                placeholder="-skipIntro -noSplash -world=empty"
              />
            </div>
          </div>
        </section>

        {/* Bouton de sauvegarde */}
        <div className="flex justify-end">
          <button className="bg-black/33 hover:bg-black/50 text-white/90 px-6 py-2 rounded transition-colors duration-200">
            Sauvegarder les paramètres
          </button>
        </div>
      </div>
    </main>
  );
}
