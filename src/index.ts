import api from "./api";

const port = process.env.PORT || 8080;

api.listen(port, () => {
    console.log(`Strongman Tracker API listening on port ${port}!`);
});
