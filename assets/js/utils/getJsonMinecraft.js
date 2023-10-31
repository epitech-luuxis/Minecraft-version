export default async function getJsonMinecraft(url) {
    return await new Promise(async (resolve, reject) => {
        await fetch('https://launchermeta.mojang.com/mc/game/version_manifest.json')
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                let minecraft = data;
                let release = minecraft.versions.filter((version) => version.type === 'release');
                let snapshot = minecraft.versions.filter((version) => version.type === 'snapshot');
                let beta = minecraft.versions.filter((version) => version.type === 'old_beta');
                let alpha = minecraft.versions.filter((version) => version.type === 'old_alpha');
                minecraft.versions = {
                    release,
                    snapshot,
                    beta,
                    alpha
                };
                resolve(minecraft.versions);
            })
            .catch((error) => reject(error));
    });
}