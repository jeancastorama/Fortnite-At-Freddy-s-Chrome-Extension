const motRechercher = "five nights";
const motRemplacer = "Fortnite";

const regex = new RegExp(motRechercher, "gi");

function convertToFortnite(element)
{
    if (element.hasChildNodes())
    {
        Array.from(element.childNodes).forEach(convertToFortnite);
    }

    else if (element.nodeType == 3)
    {
        if (element.textContent.match(regex))
        {
            element.textContent = element.textContent.replace(regex, motRemplacer);
        }
    }
}

convertToFortnite(document.body);
convertToFortnite(document.head);

