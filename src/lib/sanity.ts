import { createClient } from "next-sanity";

const projectId = process.env.projectId;
const dataset = process.env.dataset;
const apiVersion = process.env.apiVersion;
const token = process.env.SANITY_API_TOKEN;

export const sanity = createClient({ projectId, dataset, apiVersion, useCdn: false, token });