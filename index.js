
const { Octokit } = require("octokit");
const dotenv = require("dotenv");
dotenv.config()

const octokit = new Octokit({ auth: process.env.TOKEN });

const defaults = [
    {
        name: '0. WIP 👨‍💻',
        color: '572800',
        description: 'work in progress'
    },
    {
        name: '기능개선 👍',
        color: 'a2eeef',
        description: 'new feature or improvement'
    },
    {
        name: '기능구현 📝',
        color: 'c2e0c6',
        description: 'new functionality'
    },
    {
        name: '도움요청 ⛑', // help wanted
        color: '008672',
        description: 'Extra attention is needed'
    },
    {
        name: '문서화 📕',
        color: '0075ca',
        description: 'Improvements or additions to documentation'
    },
    {
        name: '버그 🐞',
        color: 'd73a4a',
        description: "Something isn't working"
    },
    {
        name: '불가능 😞',
        color: 'e4e669',
        description: "This doesn't seem right"
    },
    {
        name: '중단 ✋',
        color: 'ffffff',
        description: 'This will not be worked on'
    },
    {
        name: '중복 ♻️',
        color: 'cfd3d7',
        description: 'This issue or pull request already exists'
    },
    {
        name: '질문 ❓',
        color: 'd876e3',
        description: 'Further information is requested'
    },
    {
        name: '처음 온 사람을 위한 🤗',
        color: '7057ff',
        description: 'Good for newcomers'
    }
];


const patchMap = {
    'enhancement': defaults[1],
    'Blueprint': defaults[2],
    'help wanted': defaults[3],
    'documentation': defaults[4],
    'bug': defaults[5],
    'invalid': defaults[6],
    'wontfix': defaults[7],
    'duplicate': defaults[8],
    'question': defaults[9],
    'good first issue': defaults[10]
};

const postList = [
    defaults[0]
];

(async () => {
    // get labels of repo
    const response = await octokit.request('GET /repos/{owner}/{repo}/labels', {
        owner: process.env.OWNER,
        repo: process.env.REPO,
    })
    const originalLables = response.data;
    // patch previous labels
    for (let i = 0; i < originalLables.length; i++) {
        const labelName = originalLables[i].name;
        const dataWillBeChanged = patchMap[labelName]
        if (dataWillBeChanged) {
            console.log(labelName + 'is patching as: ');
            try {
                const patched = await octokit.request(`PATCH /repos/{owner}/{repo}/labels/${labelName.replace(/\s/g, '%20')}`, {
                    owner: process.env.OWNER,
                    repo: process.env.REPO,
                    ...dataWillBeChanged
                })
                console.log(patched.data)
                console.log('and patched!')
            } catch (e) {
                console.log('An error occured while the label: ' + labelName  + ' patched.')
            } finally {
                console.log('\n')
            }
        }
    }

    // post new customized labels;
    for (let i = 0; i < postList.length; i++) {
        const newLabelData = postList[i];
        try {

            const posted = await octokit.request(`POST /repos/{owner}/{repo}/labels`, {
                owner: process.env.OWNER,
                repo: process.env.REPO,
                ...newLabelData
            })
            console.log(`The new label ${newLabelData.name} was set as:`)
            console.log(posted.data)
        } catch (e) {
            console.log('An error occured while the label: ' + newLabelData.name  + ' created.')
        } finally {
            console.log('\n')
        }
    }
})()

