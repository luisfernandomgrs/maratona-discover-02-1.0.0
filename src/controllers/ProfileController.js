const Profile = require("../model/Profile");
module.exports = {
    index(req, res) {
        return res.render("profile", { profile: Profile.get() })
    },

    update(req, res) {
        // req.body para pegar os dados
        const data = req.body;

        // definir quantas semanas tem em 01 ano: 52
        const weeksPerYear = 52;

        // remover as semanas de férias, para obter quantas semanas uteis de trabalho há no mês...
        const weeksPerMonth = (weeksPerYear - data["vacation-per-year"]) / 12;
        
        // total de horas trabalhadas na semana
        const weeksTotalHours = data["hours-per-day"] * data["days-per-week"];

        // horas trabalhadas no mês
        const monthlyTotalHours = weeksTotalHours * weeksPerMonth;

        // qual será o valor da minha hora ?
        const valueHour = data["monthly-budget"] / monthlyTotalHours;

        // Spred = Espalhar...
        Profile.update({
            ...Profile.get(),
            ...req.body,
            "value-hour": valueHour
        });

        return res.redirect("/profile");
    }
}