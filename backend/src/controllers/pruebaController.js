exports.rutaPrueba = (req, res) => {
    return res.status(200).json({
        id: 1,
        nombre: "David",
        web: "davidboxler.es",
    });
};