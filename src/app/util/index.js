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
  mapResult2(data) {
    return {
      id: data.id,
      title: data.title,
      link: data.link,
      description: data.description,
      tags: data.Tags.map(item2 => item2.tag)
    };
  }
}

module.exports = new Util();
