function formatColor (color) {
    if (typeof color === 'string' && color.startsWith("#")){
        const rawHex = color.split('#')[1];

        return parseInt(rawHex, 16);
    }
    else {
        return Number(color);
    };
};



module.exports = class MessageBuilder {
    constructor(){
        this.embed = { fields: [] };
      
    };

    get(){
        return this.embed;
    };

    setText(text){
        this.embed.content = text;

        return this;
    }

    setAuthor(author, authorImage, authorUrl){
        this.embed.author = {};
        this.embed.author.name = author;
        this.embed.author.url = authorUrl;   
        this.embed.author.icon_url = authorImage;  
         
        return this;
    };

    setTitle(title){
        this.embed.title = title;

        return this;
    };

    setURL(url){
        this.embed.url = url;

        return this;
    };

    setThumbnail(thumbnail){
        this.embed.thumbnail = {};
        this.embed.thumbnail.url = thumbnail;

        return this;
    };

    setImage(image){
        this.embed.image = {};
        this.embed.image.url = image;

        return this;
    };

    setTimestamp(date){
        if (date){
            this.embed.timestamp = date;
        }
        else {
            this.embed.timestamp = new Date();
        };

        return this;
    };

    setColor(color){
        this.embed.color = formatColor(color);

        return this;
    };

    setDescription(description){
        this.embed.description = description;

        return this;
    };

    addField(fieldName, fieldValue, inline){
        this.embed.fields.push({
            name: fieldName,
            value: fieldValue,
            inline: inline
        });

        return this;
    };

    setFooter(footer, footerImage){
        this.embed.footer = {};
        this.embed.footer.icon_url = footerImage;
        this.embed.footer.text = footer;

        return this;
    };
};