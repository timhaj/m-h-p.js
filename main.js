function parse(text) {
    let tokens = tokenizeMarkdown(text);
    for(let i = 0;i<tokens.length;i++){
        let token = tokens[i];
        if(/^\s+$/.test(token) || token == undefined || token == '' || token == ' '){
            continue;
        } else if(/\|(.+?)\|\n\|(?:[-| ]+)\|\n((?:\|.+?\|\n)+)/gm.test(token)){
            tokens[i] = token.replace(/\|(.+?)\|\n\|(?:[-| ]+)\|\n((?:\|.+?\|\n)+)/gm, (_, headers, rows) => {
                const headerHtml = headers.trim().split('|').map(h => `<th>${h.trim()}</th>`).join('');
                const thead = `<thead><tr>${headerHtml}</tr></thead>`;
                const rowsHtml = rows.trim().split('\n').map(row => {
                    row = row.trim().split('|');
                    row.shift();
                    row.pop();
                    const cols = row.map(col => `<td>${col.trim()}</td>`).join('');
                    return `<tr>${cols}</tr>`;
                }).join('');
                const tbody = `<tbody>${rowsHtml}</tbody>`;
                return `<table>${thead}${tbody}</table>`;
            });
        } else if(/\!\[(.*)\]\((.*)\)/gm.test(token)) {
            tokens[i] = token.replace(/\!\[(.*)\]\((.*)\)/, '<img src="$2" alt="$1" />');
        } else if(/\>\s(.*)/gm.test(token)){
            tokens[i] = token.replace(/\>\s(.*)/gm, '<blockquote>$1</blockquote>');
        } else if(/\*\*(.*?)\*\*/gm.test(token)){
            tokens[i] = token.replace(/\*\*(.*?)\*\*/gm, '<strong>$1</strong>');
        } else if(/(\*{3}|\-{3}|\_{3})/gm.test(token)){
            tokens[i] = token.replace(/(\*{3}|\-{3}|\_{3})/gm, '<hr>');
        } else if(/\*(.*?)\*/gm.test(token)){
            tokens[i] = token.replace(/\*(.*?)\*/gm, '<em>$1</em>');
        }  else if(/\[(.*)\]\((.*)\)/gm.test(token)){
            tokens[i] = token.replace(/\[(.*)\]\((.*)\)/gm, '<a href="$2">$1</a>');
        } else if(/```([a-z]*)\n([\s\S]*?)```/gm.test(token)){
            tokens[i] = token.replace(/```([a-z]*)\n([\s\S]*?)```/gm, `\n<pre class="$1">\n<code>\n$2\n</code>\n</pre>`);
        } else if(/^(#{1,6})\s(.*)/gm.test(token)){
            tokens[i] = token.replace(/^(#{1,6})\s(.*)/gm, (match, hashes, headingText) => {
                const headingLevel = hashes.length;
                return `<h${headingLevel}>${headingText}</h${headingLevel}>`;
            });
        } else if(/(?:^|\n)([-+*] .+(?:\n[-+*] .+)*)/gm.test(token)){
            tokens[i] = token.replace(/(?:^|\n)([-+*] .+(?:\n[-+*] .+)*)/gm, (match) => {
                const listItems = match.trim().split('\n').map(item => {
                    return item.replace(/^[-+*] /, '\n<li>') + '</li>';
                }).join('');
                return `\n<ul>${listItems}\n</ul>`;
            });
        } else if(/(?:^|\n)([0-9]+[.] .+(?:\n[0-9]+[.] .+)*)/gm.test(token)){
            tokens[i] = token.replace(/(?:^|\n)([0-9]+[.] .+(?:\n[0-9]+[.] .+)*)/gm, (match) => {
                const listItems = match.trim().split('\n').map(item => {
                    return item.replace(/^[0-9]+[.] /, '\n<li>') + '</li>';
                }).join('');
                return `\n<ol>${listItems}\n</ol>`;
            });
        } else if(/(http[s]?\:\/{2}[^\s]*)/gm.test(token)){
            tokens[i] = token.replace(/(http[s]?\:\/{2}[^\s]*)/gm, '<a href="$1">$1</a>');
        } 
    }
    text = tokens.join('');
    text = additionalCheck(text);
    return text;
}

function tokenizeMarkdown(text) {
    const tokenRegex = /(\*{3}|\-{3}|\_{3})|(```[\s\S]*?```)|(\|(.+?)\|\n\|(?:[-| ]+)\|\n((?:\|.+?\|\n)+))|(!?\[.*?\]\(.*?\))|(^#{1,6}\s.*)|(^>.*)|(^[-+*]\s.*(?:\n[-+*]\s.*)*)|(^\d+\.\s.*(?:\n\d+\.\s.*)*)|(\*\*(.*?)\*\*)|(\*(.*?)\*)|(__.*?__)|(_.*?_)|(`.+?`)|(\n\s*\n)|(\n)|(\s+)|(http[s]?\:\/{2}[^\s]*)|[\S]*/gm;
    const tokens = text.match(tokenRegex);
    return tokens;
}

function additionalCheck(text){
    text = text.replace(/\*\*(.*?)\*\*/gm, '<strong>$1</strong>');
    text = text.replace(/\*(.*?)\*/gm, '<em>$1</em>');
    text = text.replace(/`(.*?)`/gm,'<code>$1</code>');
    return text;
}

function md2HTML() {
    let nodes = document.getElementsByClassName('md2HTML');
    for (let i = 0; i < nodes.length; i++) {
        nodes[i].innerHTML = parse(nodes[i].textContent);
    }
}

function md2HTMLParseElementText(text){
    return parse(text);
}