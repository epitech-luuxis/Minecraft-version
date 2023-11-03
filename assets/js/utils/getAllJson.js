async function getJsonMinecraft(types, htmlElement) {
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
            metaData: 'https://prod-test-1.luuxis.fr/api/MinecraftForge',
            install: 'https://maven.minecraftforge.net/net/minecraftforge/forge/${version}/forge-${version}-installer.jar'
        },
        neoforge: {
            metaData: 'https://maven.neoforged.net/api/maven/versions/releases/net/neoforged/forge',
            install: 'https://maven.neoforged.net/net/neoforged/forge/${version}/forge-${version}-installer.jar'
        },
        fabric: {
            metaData: 'https://meta.fabricmc.net/v2/versions',
            json: 'https://meta.fabricmc.net/v2/versions/loader/${version}/${build}/profile/json'
        },
        legacyfabric: {
            metaData: 'https://meta.legacyfabric.net/v2/versions',
            json: 'https://meta.legacyfabric.net/v2/versions/loader/${version}/${build}/profile/json'
        },
        quilt: {
            metaData: 'https://meta.quiltmc.org/v3/versions',
            json: 'https://meta.quiltmc.org/v3/versions/loader/${version}/${build}/profile/json'
        }
    }
}

async function getLoadderMinecraft(minecraftversion, loaderType) {
    let loaderList = [];
    let response = await fetch(loader()[loaderType].metaData);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    else response = await response.json();

    if (loaderType === 'fabric' || loaderType === 'legacyfabric' || loaderType === 'quilt') {
        let version = response.game.find(version => version.version === minecraftversion);
        let AvailableBuilds = response.loader.map(build => build.version);

        if (!version) return loaderList;
        else loaderList = AvailableBuilds
    }

    if (loaderType === 'forge') {
        let version = response[`${minecraftversion}`];

        if (!version) return loaderList;
        else loaderList = version.reverse()
    }

    if (loaderType === 'neoforge') {
        let version = response.versions.filter(version => version.includes(`${minecraftversion}-`));

        if (!version.length) return loaderList;
        else loaderList = version.reverse()
    }

    return loaderList;
}


export {
    getJsonMinecraft,
    getLoadderMinecraft,
    loader as loaderList
}