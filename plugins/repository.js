import createRepository from '~/repositories/Repository';

export default (ctx, inject) => {
  inject('repository', createRepository(ctx.$axios));
}