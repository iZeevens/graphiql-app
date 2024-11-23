import { IHeader, IVariables } from '@/types/restFullType';

interface IrestPathConnector {
  startString: string;
  url: string;
  method: string;
  body?: string;
  variables?: IVariables[];
  headers?: IHeader[];
}

const interpolateVariables = (body: string, variables: IVariables[]) => {
  let interpolatedBody = body;
  variables.forEach(({ name, value }) => {
    const regex = new RegExp(`{{${name}}}`, 'g');
    interpolatedBody = interpolatedBody.replace(regex, value);
  });
  return interpolatedBody;
};

const restPathConnector = ({
  startString,
  url,
  method,
  body,
  variables,
  headers,
}: IrestPathConnector) => {
  const encodedBody = body
    ? variables
      ? JSON.stringify(interpolateVariables(body, variables))
      : JSON.stringify(body)
    : '';

  const queryParams = headers
    ?.filter(header => header.key && header.value)
    .map(
      header =>
        `${encodeURIComponent(header.key)}=${encodeURIComponent(header.value)}`,
    )
    .join('&');

  return [
    startString,
    method && `/${method}`,
    url && `/${btoa(url)}`,
    encodedBody && `/${btoa(encodedBody)}`,
    queryParams && `?${queryParams}`,
  ]
    .filter(Boolean)
    .join('');
};

export { interpolateVariables, restPathConnector };
