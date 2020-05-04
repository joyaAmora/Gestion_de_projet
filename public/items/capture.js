document.addEventListener("DOMContentLoaded", () => {
    axios
    .get("/datas")
    .then((response) => {
        const data = response.data
        humid24Hours(data)
        temp24Hours(data)
    })
    .catch((e) => {
        console.log(e)
    })
})