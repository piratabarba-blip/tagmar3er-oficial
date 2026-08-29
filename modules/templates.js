/**
* Define a set of template paths to pre-load
* Pre-loaded templates are compiled and cached for fast access when rendering
* @return {Promise}
*/
export const preloadHandlebarsTemplates = async function() {
	return foundry.applications.handlebars.loadTemplates([

        "systems/tagmar3er_oficial/templates/apps/tesouros-tagmar.hbs",

        "systems/tagmar3er_oficial/templates/sheets/personagem-sheet.hbs",
        "systems/tagmar3er_oficial/templates/sheets/npc-sheet.hbs",
        "systems/tagmar3er_oficial/templates/sheets/inventario-sheet.hbs",
        "systems/tagmar3er_oficial/templates/sheetsPoints/personagem-sheet.hbs",

        "systems/tagmar3er_oficial/templates/sheets/combate-sheet.hbs",
        "systems/tagmar3er_oficial/templates/sheets/defesa-sheet.hbs",
        "systems/tagmar3er_oficial/templates/sheets/habilidade-sheet.hbs",
        "systems/tagmar3er_oficial/templates/sheets/magia-sheet.hbs",
        "systems/tagmar3er_oficial/templates/sheets/pertence-sheet.hbs",
        "systems/tagmar3er_oficial/templates/sheets/profissao-sheet.hbs",
        "systems/tagmar3er_oficial/templates/sheets/raca-sheet.hbs",
        "systems/tagmar3er_oficial/templates/sheets/tecnicascombate-sheet.hbs",
        "systems/tagmar3er_oficial/templates/sheets/tecnica_combate-sheet.hbs",
        "systems/tagmar3er_oficial/templates/sheets/transporte-sheet.hbs",
        "systems/tagmar3er_oficial/templates/sheets/efeito-sheet.hbs"
	]);
};
