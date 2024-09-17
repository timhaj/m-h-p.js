
function parser(text) {
    let re, x;

    re = /\!\[(.*)\]\((.*)\)/gm;
    x = text.replace(re, '<img src="$2" alt="$1" />');

    //blockquote
    re = /\>\s(.*)/gm;
    x = x.replace(re, '<blockquote>$1</blockquote>');

    //unordered list
    const unordered = x.replace(/(?:^|\n)([-+*] .+(?:\n[-+*] .+)*)/gm, (match) => {
        const listItems = match.trim().split('\n').map(item => {
            return item.replace(/^[-+*] /, '\n<li>') + '</li>';
        }).join('');
        return `\n<ul>${listItems}\n</ul>`;
    });
    x = unordered;

    //ordered list
    const ordered = x.replace(/(?:^|\n)([0-9]+[.] .+(?:\n[0-9]+[.] .+)*)/gm, (match) => {
        const listItems = match.trim().split('\n').map(item => {
            return item.replace(/^[0-9]+[.] /, '\n<li>') + '</li>';
        }).join('');
        return `\n<ol>${listItems}\n</ol>`;
    });
    x = ordered;

    //bold
    re = /\*\*(.*?)\*\*/gm;
    x = x.replace(re, '<strong>$1</strong>');
    //heading
    const htmlText = x.replace(/^(#{1,6})\s(.*)/gm, (match, hashes, headingText) => {
        const headingLevel = hashes.length;
        return `<h${headingLevel}>${headingText}</h${headingLevel}>`;
    });
    x = htmlText;
    //horizontal rule
    re = /(\*{3}|\-{3}|\_{3})/gm;
    x = x.replace(re, '<hr>');
    //italic
    re = /\*(.*?)\*/gm;
    x = x.replace(re, '<em>$1</em>');
    //link pt.1
    re = /\[(.*)\]\((.*)\)/gm;
    x = x.replace(re, '<a href="$2">$1</a>')
    //link pt.2
    //re = /(http[s]?\:\/{2}[^\s]*)/gm; //ce slucajno ne damo v []() //ta tokenizacijo potem
    //x = x.replace(re, '<a href="$1">$1</a>')
    console.log(x);
    return x;
}


function mh_parse() {
    let nodes = document.getElementsByClassName('mh_parse');
    for (let i = 0; i < nodes.length; i++) {
        nodes[i].innerHTML = parser(nodes[i].textContent);
    }
}