import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectAgeComponent } from './project-age.component';

describe('ProjectAgeComponent', () => {
  let component: ProjectAgeComponent;
  let fixture: ComponentFixture<ProjectAgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectAgeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProjectAgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
