import { project, at } from '../data-processing/wranglers';

/* to be extended by App
Summaries:
[...{ id: ID, summary: String }]
*/
export const Summaries = {
  get Summaries() {
    return [
      ...project(
        doc => ({
          summary: at(doc, 'gsx$summary', '$t'),
          id: at(doc, 'gsx$id', '$t')
        }),
        at(this.response.Summaries, 'feed', 'entry')
      )
    ];
  },

  get totalSummaries() {
    return this.Summaries.length;
  }
};
