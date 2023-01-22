import sanityClient from "@sanity/client";
import ImageUrlBuilder from "@sanity/image-url";

export const client = sanityClient({
    projectId: "n1bymzk7",
    dataset: "production",
    apiVersion: "2023-01-21",
    useCdn: true,
    token: "skp4LosMQqTjMOeiDg6wuYR9NaijTrLwlZKXdFqZsMrGxCocuAg56HGyKLVlo5A5uajZmdEJUNBoaDBgG8hFWkiXOTjYuUaAUXgP9J1rSEVcHQrzBqSrL8BSXITL7pE9WjYnVQoZ4zy69aN9lflVmhEWr1WZjHtPAmSnQz3NvJ1ApXl61gu0"
})


const builder = ImageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);