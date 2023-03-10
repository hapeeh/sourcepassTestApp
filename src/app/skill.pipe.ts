import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'Skill'
})
export class SkillPipe implements PipeTransform {
  skillSet = [{ name: 'angular', id: 1 }, { name: 'react', id: 2 }, { name: 'php', id: 3 }];
  transform(skillId: number): unknown {
    console.log('qweqwe', skillId)
    return this.skillSet.find(skill => skill.id === (skillId * 1))?.name;
  }

}
