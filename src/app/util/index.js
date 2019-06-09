class Util {
  mapResult(data) {
    return data.map(item => ({
      id: item.id,
      title: item.title,
      link: item.link,
      description: item.description,
      tags: item.Tags.map(item2 => item2.tag)
    }));
  }
}

module.exports = new Util();
