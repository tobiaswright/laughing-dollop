import { Component, effect, inject, input, signal } from '@angular/core';
import { Job } from '../../../../app.model';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-job-coverletter-creator',
  imports: [],
  templateUrl: './job-coverletter-creator.component.html',
  styleUrl: './job-coverletter-creator.component.css'
})
export class JobCoverletterCreatorComponent {
  public job = input.required<Job>();
  private clipboard = inject(Clipboard);

  copy() {
    console.log(this.coverLetterCopy());
    this.clipboard.copy(this.coverLetterCopy())
  }

private coverLetterCopy() {
  return `I am writing to express my strong interest in the ${this.job().title}, as advertised. With over 25 years of experience in technology, a deep understanding of user experience, and a proven track record of delivering innovative solutions, I believe I am well-equipped to contribute to your team's success.

Throughout my career, I have consistently demonstrated a unique blend of technical expertise and a passion for problem-solving. My commitment to understanding clients' needs and my ability to "walk in their shoes" have allowed me to drive innovation and scale businesses successfully. I am an advocate for design patterns that create maintainable and testable code, resulting in reliable product-ready deployments. I take pride in proper documentation, ensuring readable code, and automating DevOps processes for enhanced efficiency.

At my current role with Booz Allen Hamilton, I have been leading the development of cutting-edge software applications for the Department of Defense and the Intelligence Community. This position has allowed me to stay at the forefront of industry trends and foster rapid innovation. I collaborate cross-functionally, working closely with diverse groups to understand client challenges, prototype innovative solutions, and engineer effective responses.

My previous experience at Microsoft as a Software Engineer and Evangelist Lead provided me with valuable insights into technical partnerships, agile best practices, and developer relationship management. I successfully built proof-of-concept solutions, removed technical barriers, and contributed to the adoption of Azure within the organization.

Additionally, my tenure at Condé Nast and Victoria's Secret allowed me to hone my skills in front-end development and design, where I optimized frameworks, enhanced APIs, and contributed to seamless user experiences for renowned brands.

My educational background includes a Master of Arts in Management and Technology from New York University and a Bachelor of Science in Commercial Art from Alabama A&M University. I also hold certifications in Security+, AWS and Azure Fundamentals, reflecting my commitment to staying current in the ever-evolving tech landscape.

Outside of my professional endeavors, I am an active member of various organizations, including Toastmasters International, DEV/Color, and a beekeepers apprentice in my local community garden. These experiences have shaped my leadership skills and commitment to community engagement.

In conclusion, I am excited about the opportunity to bring my extensive experience, technical prowess, and passion for user experience to ${this.job().company} . I am confident that my skills align with the requirements of the ${this.job().title} position and that my contributions would be valuable to your team's continued success.

Thank you for considering my application. I look forward to the possibility of discussing how my expertise can contribute to ${this.job().company}'s mission and goals. Please feel free to contact me at 347-471-1701 or tobias.wright@gmail.com to schedule an interview.

Sincerely,
Tobias Wright`
}
}
