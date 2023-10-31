async function getJsonMinecraft(types = ['release'], htmlElement) {
    htmlElement.innerHTML = '';
    let response = await fetch('https://launchermeta.mojang.com/mc/game/version_manifest.json');

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    else response = await response.json();

    response = response.versions.filter(version => {
        for (let type of types) {
            if (version.type === type) return true;
        }
    });

    for (let version of response) {
        let div = document.createElement('div');
        div.classList.add('version');
        div.id = version.id;
        div.innerHTML = `
            <div class="versionTitle">Minecraft version ${version.id}</div>
            <div class="versionInfo">
                <div class="versionType">Type ${version.type}</div>
                <div class="versionDate">${new Date(version.releaseTime).toLocaleDateString()}</div>
            </div>
        `;
        htmlElement.appendChild(div);
    }
}

function loader() {
    return {
        forge: {
            metaData: 'https://files.minecraftforge.net/net/minecraftforge/forge/maven-metadata.json',
            install: 'https://maven.minecraftforge.net/net/minecraftforge/forge/${version}/forge-${version}-installer.jar'
        },
        neoForge: {
            metaData: 'https://maven.neoforged.net/api/maven/versions/releases/net/neoforged/forge',
            install: 'https://maven.neoforged.net/net/neoforged/forge/${version}/forge-${version}-installer.jar'
        },
        fabric: {
            metaData: 'https://meta.fabricmc.net/v2/versions',
            json: 'https://meta.fabricmc.net/v2/versions/loader/${version}/${build}/profile/json'
        },
        legacyFabric: {
            metaData: 'https://meta.legacyfabric.net/v2/versions',
            json: 'https://meta.legacyfabric.net/v2/versions/loader/${version}/${build}/profile/json'
        },
        quilt: {
            metaData: 'https://meta.quiltmc.org/v3/versions',
            json: 'https://meta.quiltmc.org/v3/versions/loader/${version}/${build}/profile/json'
        }
    }
}


export {
    getJsonMinecraft
}