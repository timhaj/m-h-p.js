
function parser(text){
    let re, x;

    re = /\>\s(.*)/gm;
    x = text.replace(re, '<blockquote>$1</blockquote>');


    const unordered = x.replace(/(?:^|\n)([-+*] .+(?:\n[-+*] .+)*)/gm, (match) => {
        const listItems = match.trim().split('\n').map(item => {
            return item.replace(/^[-+*] /, '\n<li>') + '</li>';
        }).join('');
        return `\n<ul>${listItems}\n</ul>`;
    });
    x = unordered;

    const ordered = x.replace(/(?:^|\n)([0-9]+[.] .+(?:\n[0-9]+[.] .+)*)/gm, (match) => {
        const listItems = match.trim().split('\n').map(item => {
            return item.replace(/^[0-9]+[.] /, '\n<li>') + '</li>';
        }).join('');
        return `\n<ol>${listItems}\n</ol>`;
    });
    x = ordered;

    re = /\*\*(.*?)\*\*/gm;
    x = x.replace(re, '<strong>$1</strong>');
    const htmlText = x.replace(/^(#{1,6})\s(.*)/gm, (match, hashes, headingText) => {
        const headingLevel = hashes.length;
        return `<h${headingLevel}>${headingText}</h${headingLevel}>`;
      });
    x= htmlText;
    re = /(\*{3}|\-{3}|\_{3})/gm;
    x = x.replace(re, '<hr>');
    re = /\*(.*?)\*/gm;
    x = x.replace(re, '<em>$1</em>');
    re = /\[(.*)\]\((.*)\)/gm;
    x = x.replace(re, '<a href="$2">$1</a>')
    //re = /(http[s]?\:\/{2}[^\s]*)/gm; //ce slucajno ne damo v []() //ta tokenizacijo potem
    //x = x.replace(re, '<a href="$1">$1</a>')
    console.log(x);
    return x;
}


function mh_parse(){
    let nodes = document.getElementsByClassName('mh_parse');
    for(let i = 0;i<nodes.length;i++){
        nodes[i].innerHTML = parser(nodes[i].textContent);
    }
}