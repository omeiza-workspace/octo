import Vue from 'vue';
import Router from 'vue-router';

// views
import Dashboard from './views/Dashboard';

// components
import Context from './components/Context';
import DocumentList from './components/DocumentList';
import Exporter from './components/Exporter';
import Graph from './components/Graph';
import Importer from './components/Importer';
import QuickAction from './components/QuickAction';
import TagList from './components/TagList';
import TheEditor from './components/TheEditor';
import TheLeftSidebar from './components/TheLeftSidebar';
import TheRightSidebar from './components/TheRightSidebar';
import TheSettings from './components/TheSettings';

import store from '@/store';

import {
  SET_DOCUMENT,
} from '@/store/actions';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'editor',
      component: Dashboard,
      children: [
        // editor views
        {
          path: '',
          redirect: { name: 'dashboard' },
        },
        {
          path: 'documents',
          name: 'documents',
          component: DocumentList,
        },
        {
          path: 'documents/new',
          name: 'dashboard',
          component: TheEditor,
          props: true,
          beforeEnter(to, from, next) {
            store.dispatch(SET_DOCUMENT, { id: null });
            next();
          },
        },
        {
          path: 'documents/export',
          name: 'export',
          component: Exporter,
        },
        {
          path: 'documents/import',
          name: 'import',
          component: Importer,
        },
        // document filters
        {
          path: 'documents/actionable',
          name: 'actionable',
          component: DocumentList,
          props: {
            actionable: true,
          },
        },
        {
          path: 'documents/discarded',
          name: 'discarded',
          component: DocumentList,
          props: {
            discarded: true,
          },
        },
        {
          path: 'documents/recent',
          name: 'recent',
          component: DocumentList,
          props: {
            recent: true,
          },
        },
        {
          path: 'documents/untagged',
          name: 'untagged',
          component: DocumentList,
          props: {
            untagged: true,
          },
        },
        // show meta for a document
        {
          path: 'documents/:id/meta',
          name: 'document-meta',
          component: TheRightSidebar,
          props: true,
          beforeEnter(to, from, next) {
            store.dispatch(SET_DOCUMENT, { id: to.params.id });
            next();
          },
        },
        // show a specific document
        {
          path: 'documents/:id',
          name: 'document',
          component: TheEditor,
          props: true,
          beforeEnter(to, from, next) {
            store.dispatch(SET_DOCUMENT, { id: to.params.id });
            next();
          },
        },
        // quick action
        {
          path: 'quick-action',
          name: 'quick-action',
          component: QuickAction,
        },
        // menu
        {
          path: 'menu',
          name: 'menu',
          component: TheLeftSidebar,
        },
        // context switcher
        {
          path: 'context',
          name: 'context',
          component: Context,
        },
        // tags
        {
          path: 'tags/:tag',
          name: 'tag',
          component: DocumentList,
          props: true,
        },
        {
          path: 'tags',
          name: 'tags',
          component: TagList,
          props: true,
        },
        // settings
        {
          path: 'settings',
          name: 'settings',
          component: TheSettings,
        },
        // graph view
        {
          path: 'graph',
          name: 'graph',
          component: Graph,
        },
      ],
    },
  ],
});

export default router;
