
document.addEventListener("DOMContentLoaded", () => {
    // Inicializar Supabase correctamente
    const supabaseUrl = "https://tohwhrcuehhqaofhutdq.supabase.co";
    const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRvaHdocmN1ZWhocWFvZmh1dGRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIxNzU0NDEsImV4cCI6MjA1Nzc1MTQ0MX0.-t9m7vPf20YrMl0mzktynl_q3aDh6aXTZBDuchA9nD8";
    const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

    console.log("Supabase inicializado:", supabase);

    const fileInput = document.getElementById("fileInput");
    const uploadBtn = document.getElementById("uploadBtn");
    const gallery = document.getElementById("gallery");

    uploadBtn.addEventListener("click", async () => {
        const file = fileInput.files[0];
        if (!file) {
            alert("Selecciona un archivo primero");
            return;
        }

        const { data, error } = await supabase.storage.from("uploads").upload(file.name, file);

        if (error) {
    console.error("Error al subir:", error);
    alert("Error al subir el archivo: " + error.message);
        } else {
            alert("Archivo subido con éxito");
            mostrarGaleria();
        }
    });

    async function mostrarGaleria() {
        const { data, error } = await supabase.storage.from("uploads").list();
        if (error) {
            console.error("Error al obtener archivos:", error);
            return;
        }

        gallery.innerHTML = "";
        data.forEach(file => {
            const fileUrl = `${supabaseUrl}/storage/v1/object/public/uploads/${file.name}`;
            const media = file.name.endsWith(".mp4")
                ? `<video src="${fileUrl}" controls width="200"></video>`
                : `<img src="${fileUrl}" width="200">`;

            gallery.innerHTML += media;
        });
    }

    mostrarGaleria();
});