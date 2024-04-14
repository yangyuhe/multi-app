type Subject = {
  name: SubjectName;
  relations: {
    name: RelationName;
    subject: Subject,
    reverse: boolean
  }[]
}

enum SubjectName {
  "蜜蜂",
  "花",
  "果实",
  "丁满",
  "人类",
  "腿",
  "眼睛",
  "姓名"
}

enum Movement {
  "跑",
  "看"
}


enum RelationName {
  "某一部分",
  "变态",
  "有利",
  "其中之一"
}

let subs: Subject[] = []

function addRelation(sub1: SubjectName, sub2: SubjectName, relation: RelationName) {
  let subject1 = subs.find(i => i.name === sub1)
  if (!subject1) {
    subject1 = {
      name: sub1,
      relations: []
    }
    subs.push(subject1)
  }

  let subject2 = subs.find(i => i.name === sub2)
  if (!subject2) {
    subject2 = {
      name: sub2,
      relations: []
    }
    subs.push(subject2)
  }

  subject1.relations.push({
    name: relation,
    subject: subject2,
    reverse: false
  })
  subject2.relations.push({
    name: relation,
    subject: subject1,
    reverse: true
  })
}

addRelation(SubjectName.果实, SubjectName.花, RelationName.变态)
addRelation(SubjectName.花, SubjectName.蜜蜂, RelationName.有利)
addRelation(SubjectName.丁满, SubjectName.人类, RelationName.其中之一)
addRelation(SubjectName.姓名, SubjectName.人类, RelationName.变态)
addRelation(SubjectName.丁满, SubjectName.姓名, RelationName.其中之一)
addRelation(SubjectName.腿, SubjectName.人类, RelationName.某一部分)
addRelation(SubjectName.眼睛, SubjectName.人类, RelationName.某一部分)

